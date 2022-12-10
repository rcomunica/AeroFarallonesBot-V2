const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Este comando unicamente para uso WM'),
		
	async execute(interaction) {
		return interaction.reply('Todo va bien (al parecer) :white_check_mark:');
	},
};