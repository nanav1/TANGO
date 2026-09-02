import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { parse } from 'csv-parse/sync';
import { Client, Events, GatewayIntentBits } from 'discord.js';

//단어파일 JSON화
function CsvJson(level){
  const csvText = readFileSync(
    new URL(`../data/${level}.csv`, import.meta.url),
    'utf8',
  );

  return parse(csvText, {
    columns : true,
    skip_empty_lines: true,
    trim : true,
  });
}

const n1 = CsvJson('n1');
const n2 = CsvJson('n2');
const n3 = CsvJson('n3~n5');

const curmondai = new Map();

const requiredEnv = ['DISCORD_TOKEN'];
const missingEnv = requiredEnv.filter((name) => !process.env[name]);

if (missingEnv.length > 0) {
  throw new Error(`.env에 다음 값을 입력해 주세요: ${missingEnv.join(', ')}`);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`${readyClient.user.tag} 봇이 실행되었습니다.`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
//문제출제
  if (interaction.commandName === 'n1') {
    if (curmondai.has(interaction.channelId)){
      await interaction.reply('이미 진행 중인 문제가 있음');
      return;
    }
    const mondai = n1[Math.floor(Math.random() * n1.length)];

    curmondai.set(interaction.channelId, mondai);

    await interaction.reply(`문제 : ${mondai.expression}`)
  }
    if (interaction.commandName === 'n2') {
      if (curmondai.has(interaction.channelId)){
        await interaction.reply('이미 진행 중인 문제가 있음');
        return;
      }
    const mondai = n2[Math.floor(Math.random() * n2.length)];

    curmondai.set(interaction.channelId, mondai);

    await interaction.reply(`문제 : ${mondai.expression}`)
  }
    if (interaction.commandName === 'n3') {
      if (curmondai.has(interaction.channelId)){
        await interaction.reply('이미 진행 중인 문제가 있음');
        return;
      }
    const mondai = n3[Math.floor(Math.random() * n3.length)];

    curmondai.set(interaction.channelId, mondai);

    await interaction.reply(`문제 : ${mondai.expression}`)
  }
//정답확인
  if (interaction.commandName === 'a'){
    const curmon = curmondai.get(interaction.channelId);

    if (!curmon){
      await interaction.reply('출제된 문제가 없습니다');
      return;
    }

    const userAnswer = interaction.options.getString('정답');

    if (userAnswer.trim() === curmon.reading.trim()){

      curmondai.delete(interaction.channelId);
      await interaction.reply(`${interaction.user}님 정답! **${curmon.expression}**`+`(${curmon.reading}) - ${curmon.meaning}`);
    } else {
      await interaction.reply('오답입니다.');
    }
  }
  if (interaction.commandName === 'giveup'){
    const curmon = curmondai.get(interaction.channelId);

    if (!curmon){
      await interaction.reply('출제된 문제가 없습니다');
      return;
    }

    curmondai.delete(interaction.channelId);

    await interaction.reply(`정답 **${curmon.expression}**`+`(${curmon.reading}) - ${curmon.meaning} `);
  }
  //힌트
  if (interaction.commandName === 'h'){
    const curmon = curmondai.get(interaction.channelId);

    if (!curmon){
      await interaction.reply('출제된 문제가 없습니다');
      return;
    }

    await interaction.reply(`힌트 : ${curmon.meaning}`);
  }
});

client.login(process.env.DISCORD_TOKEN);
