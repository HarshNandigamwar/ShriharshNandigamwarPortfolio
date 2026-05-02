import {Bot} from "lucide-react";

const BotAvatar = ({size = 14}: {size?: number}) => (
    <div className="w-7 h-7 rounded-xl bg-brand/15 border border-brand/50 flex items-center justify-center shrink-0">
        <Bot size={size} className="text-brand" />
    </div>
);

export default BotAvatar;
