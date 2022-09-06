import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Request, Response } from "express";

const { OK, INTERNAL_SERVER_ERROR } = StatusCodes;

export function buildBotMessageHandler(options: {
  getReply: (botId: string, message: string) => Promise<string | null>;
}) {
  const { getReply } = options;

  return async function botMessageHandler(req: Request, res: Response) {
    try {
      const { botId, message } = req.body;
      const replyMessage = await getReply(botId, message);
      return res.status(OK).json({ message: replyMessage });
    } catch (err) {
      console.log(err);
      //we are not interested to send internal system error to the end user
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  };
}
