import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/** 화면에 보이는 스타일 그대로 PDF 파일로 바로 저장 */
export const downloadElementAsPdf = async (element: HTMLElement, filename: string) => {
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: '#ffffff',
    useCORS: true,
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const contentWidth = pageWidth - margin * 2;
  const contentHeight = (canvas.height * contentWidth) / canvas.width;
  const pageContentHeight = pageHeight - margin * 2;

  let heightLeft = contentHeight;
  let position = margin;

  pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
  heightLeft -= pageContentHeight;

  while (heightLeft > 0) {
    position = heightLeft - contentHeight + margin;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
    heightLeft -= pageContentHeight;
  }

  pdf.save(filename);
};
