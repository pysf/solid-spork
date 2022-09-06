import { AxiosInstance } from "axios";

export interface Intent {
  confidence: number;
  name: string;
}
export interface IntentRecognitionResponse {
  intents: Intent[];
}

export function buildFindIntention(options: { httpClient: AxiosInstance }) {
  const { httpClient } = options;

  return async function findIntention(
    botId: string,
    message: string
  ): Promise<IntentRecognitionResponse | null> {
    const response = await httpClient.post<IntentRecognitionResponse>(
      "/api/intents",
      { botId, message }
    );

    if (response.status != 200) {
      throw Error(response.statusText);
    }

    return response.data;
  };
}
