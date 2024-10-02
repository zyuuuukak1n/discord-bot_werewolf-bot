// hey.jsのmodule.exportsを呼び出す
const heyFile = require('./commands/hey.js');

// discord.jsのライブラリの中から必要な設定を呼び出し、変数に保存する
const { Client, Events, GatewayIntentBits} = require('discord.js');

// 設定ファイルからトークン情報を呼び出し、変数に保存する
const { token } = require('./config.json');

// クライアントインスタンス（オブジェクト）を作成する
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// クライアントオブジェクトが準備OKになった時に一度だけ実行する
client.once(Events.ClientReady, c => {
    console.log(`準備OKです! ${c.user.tag}がログインします。`);
});

// スラッシュコマンドに応答するには、interactionCreateのイベントリスナーを使う必要がある
client.on(Events.InteractionCreate, async interaction => {

    // スラッシュ以外のコマンドの場合は対象外なので早期リターンさせて終了する
    // コマンドにスラッシュが使われているかどうかはisChatInputCommand()で判断している
    if (!interaction.isChatInputCommand()) return;
    
    // heyコマンドに対する処理
    if (interaction.commandName === heyFile.data.name) {
        try {
            await heyFile.excute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true});
            } else {
                await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true});
            }
        }
    } else {
        console.error(`${interaction.commandName}というコマンドには対応していません`);
    }
});

// ログインする
client.login(token);