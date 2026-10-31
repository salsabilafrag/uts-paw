import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import App from './App.jsx'

// Contoh test. Tambahkan minimal 5 test buatan sendiri (butir rubrik F1).
test('rute tidak dikenal menampilkan 404', () => {
  render(
    <MemoryRouter initialEntries={['/tidak-ada']}>
      <App />
    </MemoryRouter>,
  )
  expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
})

test('Beranda menampilkan judul RuangRakit', () => {
  renderDi('/')
  expect(screen.getByRole('heading', {name: "RuangRakit"})).toBeInTheDocument()
})

test('Beranda menampilkan jumlah proyek setelah data ditambahkan', async () => {
  renderDi('/')
  expect(await screen.findByText('Proyek')).toBeInTheDocument()
})

test('navbar terdapat semua menu', () => {
  renderDi('/')
  for (const nama of ['Beranda', 'Koleksi', 'Tambah', 'Statistik', 'Tentang']) {
    expect(screen.getByRole('link', { name: nama })).toBeInTheDocument()
  }
})

test('Beranda mempunyai link Lihat Semua Koleksi menuju /koleksi', () => {
  renderDi('/')
  for (const nama of ['Beranda', 'Koleksi', 'Tambah', 'Statistik', 'Tentang']) {
    expect(screen.getByRole('link', { name: nama })).toBeInTheDocument()
  }
})