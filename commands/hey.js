// SlashCommandBuilderをdiscord.jsからインポートする
const { SlashCommandBuilder } = require('discord.js');

// 下の形式にすることで他のファイルでインポートして使用出来るようにする
module.exports = {
    // スラッシュコマンドの定義
    data: new SlashCommandBuilder()
        .setName('hey')
        .setDescription('あいさつに反応してbotが返事します'),
    // コマンドが使用された時に実行する関数定義
    excute: async function(interaction) {   // async => 非同期     
        await interaction.reply('Fuck.');
    },
};