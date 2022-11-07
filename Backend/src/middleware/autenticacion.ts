import jwt from 'jsonwebtoken';

let rol: any;

export const verifyToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['autorizacion'];
  if (!authHeader) return res.status(403).json({ respuesta: "No tiene un token valido" });
  const token = authHeader && authHeader.split(' ')[1];
  try {
    jwt.verify(token, 'laClaveSuperSecreta');
    const decoded: any = jwt.decode(token);
    rol = decoded.nombreRol;
    next();
  } catch (error) {
    return res.status(401).json({ respuesta: "No autorizado" });
  }
}

export const administrador = async (_req: any, res: any, next: any) => {
  try {
    if (rol === 'Administrador') {
      next();
    } else return res.status(403).json({ respuesta: "No es Administrador" });
  } catch (error) {
    return res.status(500).json({ respuesta: "Error en la peticion" });
  }
};

export const secretaria = async (_req: any, res: any, next: any) => {
  try {
    if (rol === 'Secretaria') {
      next();
    } else return res.status(403).json({ respuesta: "No es Secretaria" });
  } catch (error) {
    return res.status(500).json({ respuesta: "Error en la peticion" });
  }
};
