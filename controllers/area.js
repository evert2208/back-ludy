const { response, request } = require('express');
const Area = require('../models/Areas');

const getAreas = async(req, res = response) => {
    const areas = await Area.findAll();

    res.json({
        ok: true,
        areas
    })

}

//crear
const postArea = async(req, res = response) => {

    const area = new Area(req.body);

    try {

        const areaBD = await area.save();
        res.status(201).json({
            ok: true,
            msg: 'Guardado con exito!',
            area: areaBD
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error al guardar'
        })
    }
}

//actualizar
const putArea = async(req, res = response) => {

    const areaId = req.params.id;
    try {
        const area = await Area.findByPk(areaId);
        if (!area) {
            return res.status(404).json({
                ok: false,
                msg: 'el area no existe'
            })
        }
        const newArea = {
            ...req.body
        }
        const areaAct = await Area.update(newArea, { where: { id: areaId } })
        res.json({
            ok: true,
            msg: 'Actualizada Correctamente',
            area: areaAct
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error en el servidor'
        })
    }

}

const deleteArea = async(req, res = response) => {

    const areaId = req.params.id;

    try {
        const area = await Area.findByPk(areaId);
        if (!area) {
            return res.status(404).json({
                ok: false,
                msg: 'el area no existe'
            })
        }

        await area.destroy();
        res.json({
            ok: true,
            msg: 'Area Eliminada!'

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error en el servidor'
        })
    }
}

module.exports = {
    getAreas,
    postArea,
    putArea,
    deleteArea
}