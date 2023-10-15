const crud = require("../models/crud-model.js");

const add = async (request, response) => {
  const {name, email, number} =request.body
  try {
    const newData = await crud.create({
      name,
      email,
      number,
      createdAt: Date.now(),
    });

    await newData.save();

    return response.status(200).json(newData);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

const getAll = async (request, response) => {
  try {
    const crudData = await crud.find({}).sort({ createdAt: -1 });
    return response.status(200).json(crudData);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

const update = async (request, response) => {
  const _id = request.params.id;

  try {
    const updateData = await crud.findByIdAndUpdate(
      _id,
      { name: request.body.name, email: request.body.email, number: request.body.number },
      {
        new: true,
        runValidators: true,
      }
    );

  return  response.status(200).json({
      status: 200,
      message: "update successfull",
      data: updateData,
    });
  } catch (e) {
   return response.status(400).json({
      message: e.message,
    });
  }
};

const deleteCRUD = async (request, response) => {
  try {
    const crudDelete = await crud.findByIdAndDelete(request.params.id);

    return response.status(200).json(crudDelete);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

module.exports = {
  add: add,
  getAll: getAll,
  update: update,
  deleteCRUD: deleteCRUD,
};
