from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory

llm = ChatOpenAI(openai_api_key="YOUR_API_KEY")
memory = ConversationBufferMemory()
chat_chain = ConversationChain(llm=llm, memory=memory)

response = chat_chain.run("How should I irrigate my tomato crop today?")
print(response)