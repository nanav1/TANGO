# JLPT TANGO quiz

디스코드나 카카오톡에서, 간단한 jlpt 단어 퀴즈를 내주는 봇 (추후 카톡 추가 예정)


## 기능
-N1, N2, N3~N5 문제 출제
-힌트 제공
-히라가나 발음 입력 받아서 답 판별

## 명령어
/n1 n1 단어
/n2 n2 단어
/n3 n3~n5 단어
/a  정답
/h  힌트 - 뜻이 나옴

## 실행방법
npm install - env 값 입력 - npm run register - npm start

## 프로젝트 구조

```text
jlpt-discord-bot/
├─ data/                    # n1~n5 단어 데이터
│  ├─ n1.csv
│  ├─ n2.csv
│  ├─ n3~n5.csv
├─ src/
│  ├─ index.js              # Discord 봇 실행 및 이벤트 처리
│  └─ register-commands.js  # 슬래시 명령 등록
├─ .env.example             # env 예시
├─ .gitignore
├─ package.json
└─ README.md
```

## 단어 출처
단어     - https://github.com/jamsinclair/open-anki-jlpt-decks
한국어 뜻 - https://kaikki.org/kowiktionary/%EC%9D%BC%EB%B3%B8%EC%96%B4
