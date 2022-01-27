const LongUrlElement = document.getElementById('LongURL');
const shortUrlElement = document.getElementById('shortURL');
const shortenBTN = document.getElementById('shortenBTN');
const copyBTN = document.getElementById('copyBTN');
const form = document.getElementById('urlForm');
const HOST = 'http://localhost:5500/';
let ShortURL_fix;
let LongURL_fix;


const shortenUrlReq = async (url) => {
    const response = await axios.post('/', { url })
    console.log({ data: response.data })
    return response.data['shortened-url'];
}

form.addEventListener('submit', async(event) => {
    event.preventDefault();
    const url = LongUrlElement.value;
    const ShortURL_fix = await shortenUrlReq(url);
    shortUrlElement.innerText = ShortURL_fix;
});

copyBTN.addEventListener('click', (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(shortUrlElement.innerText);
});


LongUrlElement.addEventListener('click', () => {
    LongUrlElement.style.color = 'Black';
})