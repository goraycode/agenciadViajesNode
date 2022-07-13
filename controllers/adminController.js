const paginaAdmin = (req, res) => {
    const titulo = 'Panel de administrador';
    res.render('admin', {
        titulo
    })
}

export {
    paginaAdmin
}