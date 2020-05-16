exports.seed = async function(knex) {
	await knex("dogs").truncate()
	await knex("dogs").insert([
		{ name: "Alaskan Malamute" },
		{ name: "American Bulldog" },
		{ name: "Havanese" },
    { name: "Maltese" },
    { name: "Bichon Frise"}
	])
}