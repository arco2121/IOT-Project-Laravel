export let fromServer = null;
export const fetchData = () => {
   try {
       const data = document.querySelector("meta[name='params']");
       const temp = JSON.parse(data.getAttribute("content") || "{}");
       data.remove();
       fromServer = temp;
       fromServer = Object.freeze(fromServer);
   } catch(e) {
       console.error(e);
   }
};

fetchData();
