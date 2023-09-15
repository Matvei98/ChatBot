export const sendMessage = async (message: string): Promise<string> => {
	const url = 'http://185.46.8.130/api/v1/chat/send-message';
	const requestBody = JSON.stringify({ message });

	const response = await fetch(url, {
		method: 'POST',
		body: requestBody,
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (!response.body) {
		throw new Error('Response body is null');
	}
	const text = await readResponseText(response.body);
	const contentChunks = extractContentChunks(text);
	return contentChunks.join('');
};

const readResponseText = async (body: ReadableStream<Uint8Array>): Promise<string> => {
	const reader = body.getReader();
	let text = '';
	let done = false;
	while (!done) {
		const { done:isDone, value } = await reader.read();
		done = isDone;
		if (done) break;

		const textChunk = new TextDecoder().decode(value);
		text += textChunk;
	}
	return text;
};

const extractContentChunks = (text: string): string[] => {
	const jsonObjects = text.match(/\{.*?}/g);

	if (!jsonObjects) {
		return [];
	}

	const contentChunks: string[] = [];

	for (const jsonObject of jsonObjects) {
		const jsonResponse = JSON.parse(jsonObject);
		if (jsonResponse.status === 'content') {
			contentChunks.push(jsonResponse.value || '');
		}
	}

	return contentChunks;
};