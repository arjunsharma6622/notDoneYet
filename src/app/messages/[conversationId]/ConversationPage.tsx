import CurrentConversation from '../(components)/CurrentConversation';

const ConversationPage = ({ session, currentConversationId }: any) => {
  
    return (
      <div className="flex items-center justify-center w-full">
        <div
          className="flex justify-between gap-4 mt-5 w-full"
          style={{ height: "85vh" }}
        >
          <CurrentConversation
            currentConversationId={currentConversationId}
            session={session}
          />
        </div>
    </div>
    );
  };

export default ConversationPage