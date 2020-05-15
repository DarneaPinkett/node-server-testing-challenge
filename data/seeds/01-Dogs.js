exports.seed = async function(knex) {
	await knex("Breeds").truncate()
	await knex("Breeds").insert([
		{ name: "Alaskan Malamute" },
		{ name: "American Bulldog" },
		{ name: "Havanese" },
    { name: "Maltese" },
    { name: "Bichon Frise"}
	])
}