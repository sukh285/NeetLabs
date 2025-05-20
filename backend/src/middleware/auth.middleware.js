import jwt from 'jsonwebtoken'

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
    } catch (error) {
        
    }
}