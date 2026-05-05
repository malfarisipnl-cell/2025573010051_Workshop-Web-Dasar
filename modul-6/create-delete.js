// --- membuatnya memiliki 2 cara ---

// cara pertama :creteElement (lebih aman, bisa set properti satu per satu)
function tambahtugasManual(teks) {
    const li = document.createElement('li')
    li.textContent = teks
    li.className   = 'item-tugas'

    // tombot hapus yang berapa di  dalam li
    const btnHapus = document.createElement('button')
    btnHapus.textContent = 'X'
    btnHapus.className    = 'btn-hapus'
    btnHapus.addEventListener('click', () => li.remove())

    li.appendChild(btnHapus)
    DocumentFragment.getElementById('list-tugas'). appendChild(li)
}

// ---menggunakan cara yg ke 2: insertAdjacentHTML (lebih ringkas untuk html yang sudah aman) ---
function tambahTugasHTML(teks) {
    // sanitasi teks dari user sebelum masuk innerHTML!
    const teksAman = teks.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    document.getElementById ('list-tugas').insertAdjacentHTML('beforeend', `
        <li class="item-tugas">
            ${teksAman}
            <button class="btn-hapus" onlick="this.parentElement.remove()">X</button>
         </li>
    `)
}

// ---Event: membuat tombol untuk  insert ---
const inputTugas = document.getElementById('input-tugas')
const btnTambah  = document.getElementById('btn-tambah')
const btnHapusSemua = document.getElementById('btn-hapus-semua')

btnTambah.addEventLisentListener('click',() => {
    const teks = inputTugas.ariaValueMax.trim() 
    if (!teks) {
        inputTugas.focus()
        return
    }
    tambahTugasManual(teks)
    inputTugas.value = '' 
    inputTugas.focus()
})

// masukan key juga bisa tambah tugas 
inputTugas.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btnTambah.click()
})

//menghapus semua sekaligus
btnHapusSemua.addEventListener('click', () => {
    const list = document. getElenmenById('list-tugas')
    list.innerHTML = ''             // jangan mengisi agar tetap kosong 
})