const { prefix, token } = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
	console.log('Ready!');
	client.user.setActivity('Doing bot stuff');
});


client.on('message', message => {

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();


	if (command === 'server') {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nserver created at: ${message.guild.createdAt}\n Server located in the region ${message.guild.region}\n I joined at ${message.guild.joinedAt}`);
	}
	else if (command === 'user-info') {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}\n You created your account at: ${message.author.createdAt} ${message.author.createdTimestamp} \nLast message ${message.author.lastmessage} with id ${message.author.lastMessageID} `);
	}
	else if (command === 'prune') {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
	}
	
	else if (command === 'add') {
		const amount1 = parseInt(args[0]) + 1;
		const amount2 = parseInt(args[0]) + 2;
		message.channel.send(amount1 + amount2);
	}
	}
	else {
		let messagetobesent;
		const user = message.author.username;
		const newmessage = message.content;
		for (let i = 0; i < newmessage.length; i++) {
			console.log(newmessage[i]);
			if (newmessage[i] + newmessage[i + 1] + newmessage[i + 2] + newmessage[i + 3] === 'ryan') {
				messagetobesent = user + ': ' + newmessage.replace('ryan', '?');
			}
		}
		message.channel.send(messagetobesent);
	}
});


client.login(token);