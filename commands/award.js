const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getmedal')
		.setDescription('...'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`La medalla la encontrada en \n https://discord.com/developers/active-developer`);
	},
};