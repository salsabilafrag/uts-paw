import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, expect, test, vi } from 'vitest'
import App from './App.jsx' 


const DATA = [
  {
    id: '1',
    judul: 'Sistem Informasi Akademik Mahasiswa (SIAKAD)',
    kategori: 'Web',
    teknologi: 'Laravel, PHP, MySQL',
    tahun: 2017,
    tautan: 'https://siakad.itera.ac.id',
  },
]


beforeEach(() => {
  localStorage.clear()

  vi.stubGlobal(
    'fetch', 
    vi.fn(async () => 
      new Response(JSON.stringify(DATA), {
        status: 200,
        headers: { 'Content-Type': 'application/json'},
      }),
    ),
  ) 
})

function renderDi(rute = '/') {
  return render(
    <MemoryRouter initialEntries={[rute]}>
      <App />
    </MemoryRouter>
  )
}

// Contoh test. Tambahkan minimal 5 test buatan sendiri (butir rubrik F1).
test('rute tidak dikenal menampilkan 404', () => {
  renderDi('/tidak-ada')
  expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
})

test('Beranda menampilkan judul RuangRakit', async () => {
  renderDi('/')
  expect(await screen.findByRole('heading', { level: 1, name: "RuangRakit"}), ).toBeInTheDocument()
})

test('Beranda menampilkan jumlah proyek setelah data ditambahkan', async () => {
  renderDi('/')
  expect(await screen.findByText('Proyek')).toBeInTheDocument()
  expect(await screen.getByText('Kategori')).toBeInTheDocument()
})

test('navbar terdapat semua menu', () => {
  renderDi('/')
  for (const nama of ['Beranda', 'Koleksi', 'Tambah', 'Statistik', 'Tentang']) {
    expect(screen.getByRole('link', { name: nama }), ).toBeInTheDocument()
  }
})

test('Beranda mempunyai link Lihat Semua Koleksi menuju /koleksi', () => {
  renderDi('/')
  const link = screen.getByRole('link', { name: 'Lihat Semua Koleksi', })
  expect(link).toHaveAttribute('href', '/koleksi')
})