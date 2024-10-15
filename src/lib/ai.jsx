const aiContext = `Child Protection: Abuse Prevention
Child Safety: Sexual Education
Child Well-being: Psychosocial Strengthening
Protected Childhood: Awareness and Self-care
Abuse Prevention: Strategies for Child Safety
Safe Parenting: Promoting Body Respect
Protected Childhood: Prevention Strategies`;

export const aiInstructions = {
	generateTitle: `## Instructions
    Generate a title for a chapter of a children's story.
    Use the Spanish language.
    The output text must have a maximum length of 10 words.
    The output must don't have quotes.
    Don't use markdown.
    The generated story must be based on following context:
    ${aiContext}`,

	completeTitle: `## Instructions
    Complete the following title of a chapter of a children's story.
    Use the Spanish language.
    Include the original text at the beginning of the result.
    The output text must have a maximum length of 10 words.
    Don't use markdown.
    If the input text does not provide enough context to complete the story, the topic of the generated story must be based on following context:
    ${aiContext}`,

	generateSubtitle: `## Instructions
    Generate a paragraph for a chapter of a children's story.
    Use the Spanish language.
    The output text must have a maximum length of 40 words.
    You don't have to finish the story since it's only a single paragraph of a full story.
    Don't use markdown.
    The generated story must be based on following context:
    ${aiContext}`,

	completeSubtitle: `## Instructions
    Complete the following paragraph of a children's story.
	Use the Spanish language.
	Include the original text at the beginning of the result.
	The output text must have a maximum length of 40 words.
    You don't have to finish the story since it's only a single paragraph of a full story.
    Don't use markdown.
    If the input text does not provide enough context to complete the story, the topic of the generated story must be based on following context:
    ${aiContext}`,
};
