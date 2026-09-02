import 'dotenv/config';
import { REST, Routes, SlashCommandBuilder } from 'discord.js';

const requiredEnv = ['DISCORD_CLIENT_ID', 'DISCORD_TOKEN'];
const missingEnv = requiredEnv.filter((name) => !process.env[name]);

if (missingEnv.length > 0) {
  throw new Error(`.env에 다음 값을 입력해 주세요: ${missingEnv.join(', ')}`);
}

const commands = [
  new SlashCommandBuilder()
    .setName('n1')
    .setDescription('JLPT N1 단어 퀴즈 시작'),
  
  new SlashCommandBuilder()
  .setName('n2')
  .setDescription('JLPT N2 단어 퀴즈 시작'),

  new SlashCommandBuilder()
  .setName('n3')
  .setDescription('JLPT N3~N5 단어 퀴즈 시작'),

  new SlashCommandBuilder()
  .setName('h')
  .setDescription('힌트 - 뜻 확인'),
  
  new SlashCommandBuilder()
  .setName('giveup')
  .setDescription('정답확인'),

  new SlashCommandBuilder()
    .setName('a')
    .setDescription('문제의 정답을 입력')
    .addStringOption((option)=>
     option
      .setName('정답')
      .setDescription('히라가나 발음을 적어주세요.')
      .setRequired(true),
    )
].map((command) => command.toJSON());

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

try {
  await rest.put(
    Routes.applicationCommands(
      process.env.DISCORD_CLIENT_ID,
    ),
    { body: commands },
  );
  console.log('명령어 등록이 완료되었습니다.');
} catch (error) {
  console.error('명령어 등록에 실패했습니다.', error);
  process.exitCode = 1;
}
