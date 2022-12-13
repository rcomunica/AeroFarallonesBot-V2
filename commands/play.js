const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Ejecuta el audio donde convenga mas a la situacion')
        .setName('play')
        .addStringOption(option =>
            option.setName('numero')
                .setDescription('Escriba un numero del 1 - 42')
                .setAutocomplete(true)),
        async autocomplete(interaction) {
            const focusedValue = interaction.options.getFocused();
            const choices = ['Popular Topics: Threads', 'Sharding: Getting started', 'Library: Voice Connections', 'Interactions: Replying to slash commands', 'Popular Topics: Embed preview'];
            const filtered = choices.filter(choice => choice.startsWith(focusedValue));
            await interaction.respond(
                filtered.map(choice => ({ name: choice, value: choice })),
            );
        },
};