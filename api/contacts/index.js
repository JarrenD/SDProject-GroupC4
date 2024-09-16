const fs = require('fs');

module.exports = async function (context, req) {
    const method = req.method;
    switch (method) {
        case 'GET':
            await getCars(context);
            break;
        case 'POST':
            await addCar(context, req.body);
            break;
        case 'PUT':
            await updateCar(context, req.params.id, req.body);
            break;
        case 'DELETE':
            await deleteCar(context, req.query.index); // Use req.params.id directly
            break;
        default:
            context.res = {
                status: 405,
                body: 'Method Not Allowed'
            };
            break;
    }
};

const cars = require('./cars.json');

async function getCars(context) {
    context.res = {
        body: cars
    };
}

async function addCar(context, newCar) {
    cars.push(newCar);
    try {
        const data = JSON.stringify(cars, null, 2);  
        await fs.promises.writeFile('./cars.json', data);
        context.res = {
            status: 201,
            body: newCar
        };
    } catch (error) {
        console.error('Error writing to cars.json:', error);
        context.res = {
            status: 500,
            body: 'Internal Server Error'
        };
    }
}

async function updateCar(context, id, updatedCar) {
    const index = cars.findIndex(car => car.id === id);
    if (index !== -1) {
        cars[index] = updatedCar;
        try {
            const data = JSON.stringify(cars, null, 2);  
            await fs.promises.writeFile('./cars.json', data);
            context.res = {
                body: updatedCar
            };
        } catch (error) {
            console.error('Error writing to cars.json:', error);
            context.res = {
                status: 500,
                body: 'Internal Server Error'
            };
        }
    } else {
        context.res = {
            status: 404,
            body: 'Car not found'
        };
    }
}



async function deleteCar(context, index) {
    const carIndex = parseInt(index); // Convert index to an integer
    if (!isNaN(carIndex) && carIndex >= 0 && carIndex < cars.length) {
        cars.splice(carIndex, 1);
        try {
            const data = JSON.stringify(cars, null, 2);  
            await fs.promises.writeFile('./cars.json', data);
            context.res = {
                status: 200,
                body: { message: `Car with index ${carIndex} deleted` }
            };
        } catch (error) {
            console.error('Error writing to cars.json:', error);
            context.res = {
                status: 500,
                body: 'Internal Server Error'
            };
        }
    } else {
        context.res = {
            status: 404,
            body: 'Car not found'
        };
    }
}


