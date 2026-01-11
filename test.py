from pydantic import BaseModel

class Question(BaseModel):
    question: str

@app.post("/ask")
def ask(q: Question):
    user_question = q.question

    docs = db.similarity_search(user_question, k=3)
    context = "\n".join([d.page_content for d in docs])

    prompt = f"""
You are an IT assistant for a school lab.
Answer clearly and simply.

Context:
{context}

Question:
{user_question}
"""

    response = llm.invoke(prompt)
    return {"answer": response.content}
