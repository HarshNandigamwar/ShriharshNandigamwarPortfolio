import {motion} from "framer-motion";
import ReactMarkdown from "react-markdown";
import UserAvatar from "./UserAvatar";
import BotAvatar from "./BotAvatar";

/* Types */
interface Message {
    role: "user" | "assistant";
    content: string;
}

const ChatBubble = ({msg, index}: {msg: Message; index: number}) => {
    const isUser = msg.role === "user";
    return (
        <motion.div
            initial={{opacity: 0, y: 12, scale: 0.97}}
            animate={{opacity: 1, y: 0, scale: 1}}
            transition={{duration: 0.3, delay: index === 0 ? 0 : 0}}
            className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
        >
            {isUser ? <UserAvatar /> : <BotAvatar />}

            <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed
          ${isUser ? "bg-brand/20 border border-brand/30 text-white/85 rounded-tr-sm" : "bg-white/[0.05] border border-white/10 text-white/75 rounded-tl-sm"}`}
            >
                {isUser ? (
                    msg.content
                ) : (
                    <article
                        className="prose prose-invert prose-xs max-w-none
                              prose-p:leading-relaxed prose-p:my-1
                              prose-strong:text-brand
                              prose-li:my-0 prose-ul:my-1"
                    >
                        <ReactMarkdown
                            components={{
                                strong: ({...props}) => <span className="font-bold text-brand" {...props} />,
                                ul: ({...props}) => <ul className="list-disc pl-4 space-y-1 my-1.5" {...props} />,
                                li: ({...props}) => <li className="marker:text-brand/60" {...props} />,
                            }}
                        >
                            {msg.content}
                        </ReactMarkdown>
                    </article>
                )}
            </div>
        </motion.div>
    );
};

export default ChatBubble;
