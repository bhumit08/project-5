import express from 'express'
import { addToCart,updateCart,getUserCart } from '../controllers/cartController'

const cartRouter=express.Router()