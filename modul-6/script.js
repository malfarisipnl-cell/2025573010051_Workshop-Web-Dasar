// seleksi query - satu elemen
const judul = document.querySelector(',judul')
const btn   = document.querySelector('#btn-klik')

//semua seleksi elemen query
const paragraf = document.querySelectorAll('.deskripsi')
const semuaLi = document.querySelectorAll('li')

const list = document.getElementById('list-buah')

// print ke konsol
console.log('judul:', judul)
console.log('jumlah paragraf:',paragraf.length)
console.log('list node:',list)

// navigasi dari element
const favorit = document.querySelector(',favorit')
console.log('parent:', favorit.parentElement.id)
console.log('sibling sebelum:',favorit.previousElementSibling?. textContent)
