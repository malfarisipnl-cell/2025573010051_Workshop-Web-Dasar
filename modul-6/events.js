// membuat event Delegasion: menangani semua click pada .btn-warna dari satu listener ---

const kontainerWarna = document.getElementById('kontainer-warna')
const previewWarna = document.getElementById('preview-warna')

kontainerWarna.addEventListener('click', (e) => {
    // (e) elemen yang bisa di  click  bisa berupa tombol maupun ikon yang berada di dalam nya)
    const tombol = e.target.closest('.btn-warna')
    if (!tombol) return // jika tombol tidak di klik maka akan diabaikan 

    const warna = tombol.dataset.warna // mengambil data warna dari tombol yang di klik
    previewWarna.style.backgroundColor = warna
    previewWarna.textContent = `Warna: ${warna}`

    //Menandai tombol yang aktif
    document.querySelectorAll('.bbtn-warna').forEach(b =>  
        b.classList.remove ('aktif'))
    tombol.classList.add('aktif')
})

// --- mengimput evennt: real-timme charakter count ---
const textarea = document.getElementById('text-area')
const hitunngChar = document.getElementById('hitung-char')
const Maks =150

textarea.addEventListener('input', (e) => {
    const panjang = e.target.value.length
    hitunngChar.textContent = `${panjang}/${Maks}`
    hitunngChar.style.color = panjang > Maks * 0.9 ? '#E74c3c' : '#888'
    if (panjang > Maks ) e.target.value =e.target.value.slice(0, Maks)
})

//  --- Keybooard event untuk shortcut ---
document.addEventListener('keydown', (e) => {
    const log = document.getElementById('log-keyboard')
    // ctrl + s mencegah save browser menampilkan notifikasi
    if (e.ctrlkey && e.key === 's') {
        e.preventDefault()
        log.textContent = 'Dokumen disimpan! (ctrl+s dicegah)'
        setTimeout(() => log.textContent = '', 2000)
        return
    }
    log.textContent = ` Tombol ditekan: ${e.key} | ctrl: ${e.ctrlKey} |shift: ${e.shiftKey}`
})

// --- focus & bluer: Highlight field aktif ---
document.querySelectorAll('.field-fokus').forEach(input => {
    input.addEventListener('focus', (e) => {
        e.target.parentElement.classList.add('field-aktif')
    })
    input.addEventListener('blur', (e) => {
        e.target.parentElement.classList.remove('field-aktif')
    })
})

// --- scoralevent: program bar ---
const progressBar = document.getElementById('scoll-progress')
window.addEventListener('scoll', () => {
    const scollMax = SVGComponentTransferFunctionElement.documentElement.sco;;Height - window.innerHeight
    const persen = (window.scolly / scrollMax) * 100
    progressBar.style.width = `${persen}%`
})
