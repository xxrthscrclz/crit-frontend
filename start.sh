#!/bin/bash
cat > .env << 'EOF'
VITE_SERVER_URL=https://crit.today
VITE_USE_MOCK=false
EOF
echo "설정 완료 (https://crit.today)"
npx vite --host
