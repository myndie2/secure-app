import { Router } from 'express'
import pool from '../../db/database.js'
import bcrypt from 'bcryptjs'
import { requireAdmin } from '../middleware/auth-admin.js'


const router = Router()
// Liste des utilisateurs
// router.get('/', async (_req, res) => {
//     const { rows } = await pool.query('SELECT id, login, role FROM users')
//     res.json(rows)
// })

// Création d'un utilisateur
router.post('/', async (req, res) => {
    const { login, password } = req.body
    if (!login || !password) {
    return res.status(400).json({ error: 'Login et mot de passe requis' })
    }
    try {
    const hash = await bcrypt.hash(password, 10)
    await pool.query(
    'INSERT INTO users (login, password_hash) VALUES ($1, $2)',
    [login, hash]
    );
    res.status(201).json({ message: 'Utilisateur créé' })
    } catch (err: any) {
    if (err.code === '23505') {
    res.status(409).json({ error: 'Login déjà existant' })
    } else {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' })
    }
    }
})


router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query(
      'SELECT id, login, role FROM users WHERE id = $1',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Utilisateur introuvable' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Erreur lors de la récupération de l’utilisateur :', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})




// Récupération du profil utilisateur (authentifié)
router.get('/me', async (req, res) => {
  const user = req.user
  const { rows } = await pool.query(
  'SELECT id, login, role FROM users WHERE id=$1',
  [user?.id]
  )
  res.json(rows[0]);
})

// Liste de tous les utilisateurs (réservée aux admins)
router.get('/', requireAdmin, async (_req, res) => {
  const { rows } = await pool.query(
  'SELECT id, login, role FROM users ORDER BY id'
  )
  res.json(rows)
})


export default router