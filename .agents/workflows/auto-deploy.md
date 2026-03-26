---
description: Deploy CongKong Content Marketing Engine to Firebase
---
# 자동 배포 및 GitHub 푸시 워크플로우 (Auto-Deploy & Push)

이 워크플로우는 Next.js 애플리케이션과 Firebase Functions를 프로덕션 환경에 자동 배포하고, 전체 작업 폴더를 GitHub에 커밋 후 푸시합니다.

// turbo-all
1. GitHub 리포지토리에 변경사항 커밋 및 푸시
```bash
git add .
git commit -m "chore: auto-deploy and project update"
git push origin HEAD
```

2. Firebase 배포 명령어 실행
```bash
npx firebase-tools deploy
```
