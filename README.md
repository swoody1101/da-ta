![image](https://user-images.githubusercontent.com/64128134/202651932-42df142e-9e29-4380-a9fc-22cb19f8579c.png)

# 🌊🐋 닿다 DA-TA 🐋🌊

## 💁 웹 서비스 소개

**닿다 (DA-TA)** 는 `유리병 편지`를 모티브로 한 1:1 랜덤 익명 편지 서비스입니다.<br><br>

텍스트 혹은 그림 형태의 편지를 작성하여 무작위 1명에게 전송할 수 있으며,<br>
다른 사람이 작성한 편지에 대해 1회성으로 답장을 보내거나 보관하여 간직할 수 있습니다.

<br />

**[🔗 서비스 소개 영상 바로가기 Click !](https://www.youtube.com/watch?v=bfIJXaTw7JY)** 👈

> 새 창 열기 방법 : CTRL+click (on Windows and Linux) | CMD+click (on MacOS)

<br />

## 📅 개발 기간

2022.10.11. ~ 2022.11.18.

<br />

## 🔥 주요 기능

- 메인 화면
  - 바다에 띄워진 편지의 개수를 확인할 수 있습니다.
  - 소셜(카카오) 로그인을 통하여 서비스를 이용 할 수 있습니다.
  - 최초 로그인 시 자동으로 닉네임을 생성하여 줍니다.
- 오늘의 질문 & 답변
  - 메인화면의 물병을 클릭하여 오늘의 질문을 확인할 수 있습니다.
  - 답변하기 버튼을 클릭하여 오늘의 질문에 대한 나의 생각을 공유할 수 있습니다.
  - 다른 답변 보기 버튼을 클릭하여 다른 사용자들의 답변을 확인하며, 내용이 부적절할 시 신고 기능을 사용할 수 있습니다.
- 편지 쓰기
  - 편지 공통 옵션으로 원하는 편지지 및 글씨체를 선택, 수신자의 연령대를 설정, 답장을 받을지의 여부를 설정 할 수있습니다.
  - 텍스트 편지는 최소 30자 최대 1000자까지 입력 할 수 있으며, 편지를 발송하기 전 KMP 알고리즘을 사용한 유해성 검사를 진행 합니다.
  - 그림 편지는 다양한 그림판 옵션(펜의 색상, 펜의 굵기, 지우개)을 지원하며, 편지를 발송하기 전 Google cloud vision api를 사용하여 유해성 검사를 진행합니다.
- 편지 받기
  - 바다에 떠다니는 편지를 받을 수 있으며, 받은 편지가 마음에 들 시 보관함에 보관할 수 있습니다. (답장이 필요 없는 편지 한정)
  - 받은 편지의 내용을 다른 사람과도 공유하고 싶거나, 답장이 어려울 경우 바다에 다시 띄울 수 있습니다. (다시 띄워진 편지는 여러 번 띄우지는 경우 자동으로 소멸됩니다.)
  - 편지의 내용이 부적절할 시 신고 기능을 사용할 수 있습니다.
- 마이페이지
  - 수집한 편지함에서 내가 수집한 편지 목록을 확인하고 수집한 편지의 상세조회 및 삭제를 할 수 있습니다.
  - 답장 받은 편지함에서 내가 쓴 편지에 대한 답장을 확인할 수 있으며 답장의 상세조회, 삭제 및 신고 기능을 사용할 수 있습니다.
  - 개인설정
    - 사용자의 나이대를 설정할 수 있습니다.
    - 회원 탈퇴를 진행할 수 있습니다.
- 관리자
  - 편지 신고 관리를 통해 신고된 편지를 확인하고 신고 처리 및 반려를 진행할 수 있습니다.
  - 오늘의 질문 답변 신고 관리를 통해 신고된 답변을 확인하고 신고 처리 및 반려를 진행할 수 있습니다. (3회 이상 신고 처리 누적 시 사용자는 자동으로 계정 정지에 들어갑니다.)
  - 사용자 관리를 통해 전체 사용자의 목록을 조회하며, 사용자의 권한을 관리할 수 있습니다.
  - 오늘의 질문 관리의 캘린더를 사용하여 해당 날짜의 오늘의 질문을 등록할 수 있습니다.

<br />

## 🛠 기술 스택

### **Front-end**

| <img src="https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg" alt="HTML5" width="50px" height="50px" /> | <img src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg" alt="CSS3" width="50px" height="50px" /> | <div align="center"><img src="https://user-images.githubusercontent.com/64128134/202632312-ae33138a-246a-44dc-ac35-54ce12ab720a.png" alt="Javascript" width="50px" height="50px" /></div> |
| :----------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                             HTML5                                                              |                                                             CSS3                                                             |                                                                                        Javascript                                                                                         |

| <img src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React.js" width="50px" height="50px" /> | <img src="https://user-images.githubusercontent.com/64128134/202525503-90efffe8-79f8-49a7-9e5a-a021f936be7c.png" alt="Recoil" width="50px" height="50px" /> |
| :-------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                               React                                                               |                                                                           Recoil                                                                            |

| <div align="center"><img src="https://user-images.githubusercontent.com/64128134/202650891-9f193a73-ca8a-4bb4-ad9c-efc36455bc7e.png" alt="Styled-Component" width="50px" height="50px" /></div> | <img src="https://axios-http.com/assets/logo.svg" alt="MUI" width="50px" height="50px" /> |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: |
|                                                                                        Styled-Component                                                                                         |                                           Axios                                           |

### **Back-end**

| <div align="center"><img src="https://profilinator.rishav.dev/skills-assets/java-original-wordmark.svg" alt="Java" width="50px" height="50px" /></div> | <div align="center"><img src="https://www.seekpng.com/png/full/8-80775_spring-logo-png-transparent-spring-java.png" alt="Spring-Boot" width="50px" height="50px" /></div> | <div align="center"><img src="https://user-images.githubusercontent.com/46440898/185340935-0d35ed10-a892-48ec-819c-92aa989cb60b.png" alt="SpringSecurity" width="50px" height="50px" /></div> | <div align="center"><img src="https://media.vlpt.us/images/2012monk/post/86ce779f-a08b-438d-836c-8dbe6e5a8cc0/hibernate_icon_whitebkg.svg" alt="Hibernate" width="50px" height="50px" /></div> |
| :----------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                          Java                                                                          |                                                                                Spring-Boot                                                                                |                                                                                        SpringSecurity                                                                                         |                                                                                           Hibernate                                                                                            |

| <img src="https://user-images.githubusercontent.com/64128134/202521943-c36b5ed9-94a0-454f-8582-631d562968fd.png" alt="Redis" width="50px" height="50px" /> | <img src="https://user-images.githubusercontent.com/64128134/202522212-6e9fbeb5-7336-4d38-8d48-5d05189e5455.png" alt="Firebase" width="50px" height="50px" /> | <img src="https://profilinator.rishav.dev/skills-assets/mysql-original-wordmark.svg" alt="MySQL" width="50px" height="50px" /> |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: |
|                                                                           Redis                                                                            |                                                                           Firebase                                                                            |                                                             MySQL                                                              |

### **DevOps**

| <img src="https://profilinator.rishav.dev/skills-assets/nginx-original.svg" alt="NGiNX" width="100px" height="50px" /> | <img src="https://pbs.twimg.com/profile_images/1351702967561252865/aXfcETIt_400x400.jpg" alt="aws" width="50px" height="50px" /> | <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Jenkins_logo.svg/1200px-Jenkins_logo.svg.png" alt="Jenkins" width="50px" height="50px" /> | <img src="https://profilinator.rishav.dev/skills-assets/docker-original-wordmark.svg" alt="docker" width="50px" height="50px" /> | <div align="center"><img src="https://user-images.githubusercontent.com/64128134/202525118-6c553ae0-e38b-490f-bbb4-cca9dbe5ea70.png" alt="sonarqube" width="50px" height="50px" /></div> |
| :--------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                         NGiNX                                                          |                                                               aws                                                                |                                                                            Jenkins                                                                            |                                                              docker                                                              |                                                                                        SonarQube                                                                                         |

### **Frontend Libraries & Tools**

- aos 2.3.4
- axios 0.27.2
- firebase 9.13.0
- moment 2.29.4
- react 17.0.2
- react-calendar 4.0.0
- react-color 2.19.3
- react-dom 17.0.2
- react-router-dom 6.4.2
- react-scroll-to-top 3.0.0
- react-slick 0.29.0
- recoil 0.7.6
- recoil-persist 4.2.0
- styled-components 5.3.6
- sweetalert2 11.6.2

### **Backend Libraries & Tools**

- Java 1.8
- SpringBoot 2.7.1
- SpringSecurity 2.7.1
- jjwt 0.11.2
- Hibernate 5.6.9.Final
- redis
- MySQL

### **API**

- google-cloud-vision 26.1.3
- kakao login

<br/>

## EC2 포트 정리

| <div align="center">**PORT**</div> | <div align="center">**이름**</div> |
| :--------------------------------: | :--------------------------------: |
|                 80                 |            HTTP, nginx             |
|                443                 |               HTTPS                |
|                3306                |               MySQL                |
|                6379                |               Redis                |
|                8080                |       SpringBoot API Server        |
|                9000                |             SonarQube              |
|                9090                |              Jenkins               |

<br/>

## 💡 주요 기능

- 완성 예정

<br/>

## 📂 프로젝트 아키텍쳐

![image](https://user-images.githubusercontent.com/64128134/202652959-7220d048-2874-4fdd-8258-f2d79addf326.png)

---

<br />

## 📑ERD

![erd](https://user-images.githubusercontent.com/96644445/202732605-b46af595-a973-4b4d-ba27-1c0c0cea4e83.png)

---

<br />

## 👪 개발 팀 소개

<table>
<tr>
<td align="center" width="160px">
<a href="[https://github.com/BoyeonK](https://github.com/BoyeonK)" target="_blank">
<a href="https://github.com/BoyeonK"><img height="160px" width="120px" src="https://user-images.githubusercontent.com/64128134/202625000-8e75870c-910e-495a-80e2-155c57ac4ba5.png" alt="김보연 프로필"/></a>
</a>
</td>
<td align="center" width="160px">
<a href="[https://github.com/kimchaeyun6](https://github.com/kimchaeyun6)" target="_blank">
<a href="https://github.com/kimchaeyun6"><img height="160px" width="120px" src="https://user-images.githubusercontent.com/64128134/202631591-4dafddc0-4a90-42de-bd31-c446fbea33f1.png" alt="김채윤 프로필"/></a>
</a>
</td><td align="center" width="160px">
<a href="[https://github.com/win9612](https://github.com/win9612)" target="_blank">
<a href="https://github.com/win9612"><img height="160px" width="120px" src="https://user-images.githubusercontent.com/64128134/202626189-f23d9781-0a14-4a05-a705-4b89a25492b8.jpg" alt="조민규 프로필"/></a>
</a>
</td><td align="center" width="160px">
<a href="[https://github.com/tgb02087](https://github.com/tgb02087)" target="_blank">
<a href="https://github.com/tgb02087"><img height="160px" width="120px" src="https://user-images.githubusercontent.com/64128134/202630193-dd9b0702-7f05-4f32-8359-4b9be6f87316.png" alt="김강호 프로필"/></a>
</a>
</td><td align="center" width="160px">
<a href="[https://github.com/yoonArchive](https://github.com/yoonArchive)" target="_blank">
<a href="https://github.com/yoonArchive"><img height="160px" width="120px" src="https://user-images.githubusercontent.com/64128134/202631956-50973873-5dcc-4042-89e3-d20f9ca4826e.png" alt="박기윤 프로필"/></a>
</a>
</td><td align="center" width="160px">
<a href="[https://github.com/swoody1101](https://github.com/swoody1101)" target="_blank">
<a href="https://github.com/swoody1101"><img height="160px" width="120px" src="https://user-images.githubusercontent.com/64128134/202630318-a644b353-99e5-4487-83fc-6a9ef372c7cb.png" alt="이상우 프로필"/></a>
</a>
</td>
</tr>
<tr>
<td align="center">
<a href="[https://github.com/win9612](https://github.com/win9612)" target="_blank">
김보연<br />(Frontend)
</a>
</td><td align="center">
<a href="[https://github.com/win9612](https://github.com/win9612)" target="_blank">
김채윤<br />(Frontend)
</a>
</td><td align="center">
<a href="[https://github.com/win9612](https://github.com/win9612)" target="_blank">
조민규<br />(Frontend)
</a>
</td><td align="center">
<a href="[https://github.com/win9612](https://github.com/win9612)" target="_blank">
김강호<br />(Backend)
</a>
</td><td align="center">
<a href="[https://github.com/win9612](https://github.com/win9612)" target="_blank">
박기윤<br />(Backend)
</a>
</td><td align="center">
<a href="[https://github.com/win9612](https://github.com/win9612)" target="_blank">
이상우<br />(Backend)
</a>
</td>
</tr>
</table>

<br />

| <div align="center">이름</div> | <div align="center">역할</div> | <div align="center">개발 내용</div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :----------------------------: | :----------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|             김보연             |       Frontend<br />팀장       | - 편지받기, 마이페이지의 와이어 프레임 작성 및 디자인 구현<br>- 모바일, 태블릿, 데스크탑 환경을 고려한 반응형 웹 작성<br>- Atomic Design을 이용한 Component 구성 및 재사용성 확장<br>- Recoil을 이용한 상태관리 및 사용자의 동작에 따른 분기 처리<br>- Recoil-persist를 이용한 사용자의 비 정상적 접근 , 오류, 등에대한 예외처리<br>- Styled-Component를 이용한 동적 스타일링 및 Component화<br>- 편지 받기 애니메이션 및 기능 구현<br>- Nested Routes 기능을 이용한 보관함, 개인설정 기능 구분<br>- 연령대 설정 기능 및 회원 탈퇴 기능 구현<br>- 편지 보관함 페이지 구현<br>                                                                                                                                                                                                                                                                                                                                                           |
|             김채윤             |            Frontend            | - API 연결 - 현재 띄워진 편지 개수<br> - API 연결 - 오늘의 질문 답변 보내기<br> - API 연결 - 해당 날짜의 오늘의 질문 띄우기 <br>- 메인페이지 디자인 및 애니메이션 적용 구현<br>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|             조민규             |            Frontend            | - Styled-Component를 이용한 CSS-in-JS 방식으로 스타일링 작업<br> - 미디어 쿼리를 활용한 반응형 웹 디자인 <br> - Atom 공통 컴포넌트 구현(버튼, 체크박스, 드롭다운, 입력창, 모달, 텍스트) <br> - 헤더, SlideMenu 컴포넌트 구현<br> - 로딩 스피너 구현<br> - 로그인 - 카카오 소셜 로그인 구현<br> - 로그인 - Recoil을 활용한 회원 정보 상태 관리<br> - 로그인 - Axios Interceptor를 활용한 access token 관리, 만료 시 재발급 로직 구현 <br> - 오늘의질문 답변 조회, 신고 기능 개발 <br> - 페이지 개발 (편지 쓰기, 편지 답장, 관리자) <br> - 편지 쓰기 - 텍스트 편지 기능 개발 <br> - 편지 쓰기 - html canvas element를 활용한 도화지 편지 기능 개발<br>- 편지 쓰기 - 옵션 기능 개발<br>- 편지 쓰기 - canvas 이미지 firebase storage 저장 및 로드 기능 구현<br>- 관리자 - 편지 및 오늘의질문 답변 신고 관리 구현<br>- 관리자 - 가입된 사용자 관리 구현<br>- 관리자 - react-slick 라이브러리를 활용한 캘린더 형태의 오늘의질문 관리 구현<br> |
|             김강호             |       Backend<br/>Infra        | - Infra : Jenkins 활용, CI/ CD 환경 구축<br>- Infra : Dockerfile 및 Jenkinsfile 스크립트 활용, 자동 배포 구축<br>- Infra : AWS서버 Nginx 구축 및 ssl 인증<br>- Infra : Docker image & container 생성 및 환경 구축<br>- Infra : MySQL, Redis 구축<br>- API : 오늘의 질문 기능 개발<br>- API : 오늘의 질문 답변 기능 개발<br>- API : 오늘의 질문 신고 기능 개발<br>- Test : SonarQube 환경 구축, BE, FE 정적 코드 분석 실행<br>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|             박기윤             |            Backend             | - OAuth2.0 이용하여 카카오 로그인/회원가입 구현<br> - Spring Security, JWT를 이용한 토큰 기반 인증 구현, refresh token을 활용한 로그인 상태 유지, 회원 권한에 따른 접근 제어 <br> - 회원 기능 : User 관련 Entity 작성, 닉네임 랜덤 생성 api 호출 <br> - 마이페이지 기능 : 회원 연령대 수정, 회원 탈퇴 기능 <br> 관리자 기능 : 사용자 목록 조회 및 권한 부여, 오늘의 질문 관리 기능, 편지 및 오늘의 답변 신고 목록 조회, 신고 및 신고 반려 처리 <br>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|             이상우             |            Backend             | - 도메인 설계 및 구현 <br> - 편지 쓰기 API : 텍스트 및 그림 편지 쓰기 기능 구현 <br> - 띄워진 편지 API : 띄우진 편지 개수 조회, 떠다는 편지 받기, 편지 다시 띄우기 기능 구현 <br> - 답장 편지 API : 받은 편지 답장, 새로운 답장 푸시 알림, 답장 받은 편지 목록 조회, 답장 받은 편지 상세 조회, 답장 받은 편지 삭제 기능 구현 <br> - 수집한 편지 : 받은 편지 수집하기, 수집한 편지 목록 조회, 수집한 편지 상세 조회, 수집한 편지 삭제하기 기능 구현<br>- 유해성 검사 Redis set 생성 API 구현<br>- Redis와 KMP 알고리즘을 이용한 텍스트 편지 유해성 검사 API 구현<br>- Google Cloud Vision API의 Safe Search를 활용한 이미지 편지 유해성 검사 API 구현<br>                                                                                                                                                                                                                                                                                |

<br />

## 커밋 규칙

### **Git Flow 관련 작성법**

- `feat/[닉네임]/[issue 번호]`
  - ex) 김강호 작성시, feat/kh/3

### **Gitlab에서 Issue 작성 규칙**

- Title - [FE] 로그인 페이지 구현
- Type - ISSUE
- 설명 - 로그인 INPUT 작성 / 로그인 버튼 클릭시 이벤트 등 자유 양식으로 설명 적기
- Label - 중복으로 선택이 가능하니, 알아서 선택해서 작성하기
  - ex. feat 선택
- 완료 클릭
- 이슈 목록에서 할당된 이슈번호 확인 후 `머지리퀘스트 만들기` 클릭하여 주어진 이슈 번호 확인

### **Git commit type**

- `feat:`
  - 새로운 기능 추가
  - ex) feat: 이메일 인증
- `refactor:`
  - 코드 리팩토링
- `chore:`
  - (코드의 수정 없이) 설정 변경
- `fix:`
  - 버그 수정
- `style:`
  - 코드 스타일 변경
- `docs:`
  - 문서의 등록 및 수정
- `test:`
  - 테스트

## 프로젝트 디렉토리 구조

### Frontend

```
frontend
├─📦public
│  └─📂assets
│      ├─📂images
│      │  ├─📂auth
│      │  ├─📂common
│      │  ├─📂letter
│      │  ├─📂mainpage
│      │  └─📂mypage
│      ├─📂logo
│      └─📂video
├─📦src
│  ├─📂api
│  ├─📂components
│  │  ├─📂atoms
│  │  │  ├─📂landing
│  │  │  ├─📂letter
│  │  │  └─📂mypage
│  │  ├─📂molecules
│  │  │  ├─📂landing
│  │  │  ├─📂letter
│  │  │  └─📂mypage
│  │  ├─📂organisms
│  │  │  ├─📂landing
│  │  │  └─📂mypage
│  │  └─📂templates
│  │      └─📂admin
│  ├─📂constants
│  ├─📂pages
│  │  ├─📂admin
│  │  ├─📂error
│  │  ├─📂landing
│  │  ├─📂letter_read
│  │  ├─📂letter_write
│  │  └─📂mypage
│  ├─📂recoil
│  ├─📂styles
│  │  └─📂fonts
│  └─📂utils
│      └─📂validation
├─📜.env
├─📜.firebaserc
├─📜.gitignore
├─📜Dockerfile
├─📜firebase.json
├─📜firestore.indexes.json
├─📜nginx.conf
├─📜package-lock.json
├─📜package.json
└─📜storage.rules
```

### Backend

```
backend
└─📦da_ta
   ├─📦gradle/wrapper
   ├─📦src
   │  ├─📂main
   │  │  ├─📂java
   │  │  └─📂com/da_ta/backend
   │  │  │     ├─📂account
   │  │  │     │  ├─📂admin
   │  │  │     │  │  ├─📂controller
   │  │  │     │  │  │  └─📂dto
   │  │  │     │  │  └─📂service
   │  │  │     │  ├─📂jwt
   │  │  │     │  └─📂user
   │  │  │     │     ├─📂controller
   │  │  │     │     │  └─📂dto
   │  │  │     │     ├─📂domain
   │  │  │     │     │  ├─📂entity
   │  │  │     │     │  └─📂repository
   │  │  │     │     └─📂service
   │  │  │     ├─📂common
   │  │  │     │  ├─📂config
   │  │  │     │  ├─📂controller
   │  │  │     │  └─📂domain
   │  │  │     │     └─📂exception
   │  │  │     ├─📂config
   │  │  │     ├─📂letter
   │  │  │     │  ├─📂controller
   │  │  │     │  │  └─📂dto
   │  │  │     │  ├─📂domain
   │  │  │     │  │  ├─📂entity
   │  │  │     │  │  └─📂repository
   │  │  │     │  └─📂service
   │  │  │     ├─📂question
   │  │  │     │  ├─📂controller
   │  │  │     │  │  └─📂dto
   │  │  │     │  ├─📂domain
   │  │  │     │  │  ├─📂entity
   │  │  │     │  │  └─📂repository
   │  │  │     │  └─📂service
   │  │  │     └─📂util
   │  │  └─📂resources
   │  │     ├─📜application.oauth.properties
   │  │     ├─📜application.properties
   │  │     ├─📜env.properties
   │  |     └─📜data.sql
   │  └─📂test/java/com/da_ta/backend
   ├─📜build.gradle
   ├─📜Dockefile
   ├─📜gradlew
   ├─📜gradlew.bat
   ├─📜Jenkinsfile
   └─📜setting.gradle
```
