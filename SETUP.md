# 설치 & 배포 가이드

## 1. 의존성 설치 + 로컬 실행

PowerShell에서:
```powershell
cd C:\Users\user\Myeongri_jjyu
npm install
npm run dev
```
→ http://localhost:3000 에서 확인

## 2. KASI API 키 설정

1. https://data.go.kr 접속 → 회원가입
2. "한국천문연구원_음양력 정보" 검색 → 활용신청
3. 마이페이지에서 인증키(Encoding) 복사
4. `.env.local` 파일 만들고:
```
KASI_API_KEY=발급받은_키
```

## 3. Git 초기화 + GitHub 푸시

```powershell
cd C:\Users\user\Myeongri_jjyu

# 기존에 만들어진 .git 폴더가 있다면 삭제
Remove-Item -Recurse -Force .git -ErrorAction SilentlyContinue

# 새로 초기화
git init -b main
git add .
git commit -m "feat: initial commit — Next.js + KASI 사주 사이트"
git remote add origin https://github.com/hyunjun82/Myeongri_jjyu.git
git push -u origin main
```

GitHub 인증창이 뜨면 본인 계정으로 로그인하시면 됩니다.

## 4. Cloudflare Pages 배포

1. https://dash.cloudflare.com → **Pages** → **Create a project**
2. **Connect to Git** → `hyunjun82/Myeongri_jjyu` 선택
3. Build settings:
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
4. **Environment variables**:
   - 변수명: `KASI_API_KEY`
   - 값: 발급받은 키 입력
5. **Deploy** 클릭

## 5. 서브도메인 연결

배포 완료 후:
1. Pages 프로젝트 → **Custom domains** → **Set up a custom domain**
2. `myeongri.jjyu.co.kr` 입력
3. Cloudflare가 자동으로 CNAME 추가 (jjyu.co.kr이 이미 Cloudflare에 있다면 자동)
4. 5~10분 후 https://myeongri.jjyu.co.kr 자동 SSL로 열림

## 6. 이후 업데이트

코드 수정 후:
```powershell
git add .
git commit -m "수정 내용"
git push
```
→ Cloudflare가 자동으로 재배포

## 면책

본 서비스의 모든 풀이는 참고·재미 목적이며 의료·법률·재무 결정의 근거가 될 수 없습니다.
