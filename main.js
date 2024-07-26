
const colorInpEl = document.getElementById('color')
const modeInpEl = document.getElementById('mode')

document.getElementById('get-color-scheme')
    .addEventListener('submit',(e)=>{
        e.preventDefault();

        getColorScheme(colorInpEl.value.substring(1),modeInpEl.value)
    })

getColorScheme(colorInpEl.value.substring(1),modeInpEl.value)
const defaultColors = ["#FF5A5A","#FF5A5A","#FF5A5A","#FF5A5A","#FF5A5A"]
function getColorScheme(color,mode){
    const baseUrl = `https://www.thecolorapi.com/scheme?`
    fetch(`${baseUrl}hex=${color}&mode=${mode}&count=5`)
        .then(response => response.json())
        .then(data => data['colors'].map(x=>x.hex.value))
        .then(colors=>renderColorScheme(colors))
        .catch(error=> {
            renderColorScheme(defaultColors)
            console.error(error)
        })

}


function renderColorScheme(colorArray)
{
    console.log("rendering colors",colorArray)
    const generatedColorsEl = document.getElementById('generated-colors')

    generatedColorsEl.innerHTML = colorArray.map(color=>renderColor(color)).join('')
}

function renderColor(color)
{
    return `<div class="display-color" style="background-color:${color}" 
                data-color-hex="${color}">
            </div>
            <div class="display-color-card" data-color-hex="${color}">
             <p>
             ${color}
             </p>
            </div>`
}

document.addEventListener('click',(e)=>
{
    if(e.target.dataset.colorHex)
    {
        const color = e.target.dataset.colorHex

        navigator.clipboard.writeText(color)
            .catch(e => console.error(e))

        document.getElementById('message').textContent = `copied color ${e.target.dataset.colorHex}`

    }
})