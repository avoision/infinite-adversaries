const weaponPrompt = `Generate a list of 20 random weapons by name only, ranging from modern, historical, mythical, and makeshift. Make one of these weapons a silly item, but do not use the word silly. Make one of these weapons an item that could be purchased for less than $5.

Store this information as JSON, using the following format:
{
"weaponOptions": [{
  "weaponName": ""
}]}

In the style of a narrator, using second person perspective, in a paragraph, describe a room with a table that you might find in a fantasy adventure movie. The scene should be mysterious, and evoke a sense of anticipation. Describe the table, where four weapons are seemingly waiting for one of them to be chosen, but do not describe the weapons or mention any weapon by name. Store this information as JSON, using the following format:
{
  "paragraph": ""
}

Finally, combine all the stored information as a single JSON response.`;

export { weaponPrompt };
