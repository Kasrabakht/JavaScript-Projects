let words=[
  "apple", "ball", "cat", "dog", "fish",
  "sun", "moon", "car", "book", "tree",
  "planet", "guitar", "camera", "bridge", "ticket",
  "orange", "pencil", "cloudy", "rabbit", "silver",
  "banana", "flower", "garden", "window", "butter",
  "javascript", "algorithm", "encyclopedia", "microscope", "philosophy"];
let remainingChances = 10;
let currentWord = "";

function pickRandomWord(arr)
{
 const i=Math.floor(Math.random()*arr.length);
 return arr[i];
}

function createBlanks(word)
{
    const slot= document.getElementById("slots");
    slot.innerHTML="";

    [...word].forEach(ch=>{
        if(ch==='')
        {

        const space=document.createElement("div");
        space.className="space";
        slot.appendChild(space);
        return;
        }
         const box=document.createElement("input");
         box.type="text";
         box.className="box";
         box.maxLength=1;
         box.dataset.answer=ch.toLowerCase();
         slot.appendChild(box);

    })

}
function onClick()
{ 
  currentWord = pickRandomWord(words).toLowerCase();
  createBlanks(currentWord);
  remainingChances=10;
  const msg=document.getElementById("massage");
  if(msg) msg.textContent="";

    if(!document.getElementById("Enter"))

    {
       const row = document.querySelector('.button-row');
       const enterButton=document.createElement("button");
       enterButton.id="Enter";
       enterButton.type="button";
       enterButton.textContent="Enter";
       row.appendChild(enterButton);
       enterButton.addEventListener("click", onEnter);
    }
}
function onEnter()
{
    const inputs = document.querySelectorAll("#slots input");
    if(!inputs.length)
    {
        return;
    }
     let anyWrong = false;
     let anyCorrect=false;
     inputs.forEach((input,i) =>
     {
          const typed= (input.value || "").toLowerCase();
          const answer=(input.dataset.answer || "").toLowerCase();

        if(typed===answer)
             {
             input.value=answer;
             input.style.backgroundColor="lightgreen";
             input.disable=true;
              const next = inputs[i + 1];
              if (next) {
                 next.focus();
                }
             anyCorrect=true;
            }
        else
        {
            if(typed!="") anyWrong=true;
            input.value="";
            input.style.backgroundColor="salmon";
            setTimeout(() => { input.style.backgroundColor = ""; }, 150);
        }
    });
    const allLoked=[...inputs].every(inp=>inp.disable);
    if(allLoked)
    {
        const msg=document.getElementById("massage");
        if(msg) msg.textContent=`✅ Correct! The word was "${currentWord}".`;
    return;
    }
    if(anyCorrect && !anyWrong)
    {
        const msg=document.getElementById("massage");
        if (msg) 
            {
                msg.textContent = "✅ You guessed a letter correctly!";
                msg.className = "correct";
            }
    return;
    }
    if(anyWrong) remainingChances--;
    const msg=document.getElementById("massage");
    if(remainingChances>0)
    {
        msg.textContent=`❌ Not quite. ${remainingChances} chance(s) left.`;
        const next=[...inputs].find(input=>!input.disable);
        if(next) next.focus();
    }
    else
    {
        inputs.forEach((inp, i)=>
        {
            inp.value=currentWord[i] || "";
            inp.style.backgroundColor="salmon";
            inp.disable=true;


        });
        if(msg) 
            {
                msg.textContent=`💀 No more chances! The word was "${currentWord}".`;
                msg.className = "wrong";
            }
    }


}
