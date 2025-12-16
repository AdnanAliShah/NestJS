import { CreateProductsDto } from './DTOs/createproduct.dto';
import { UpdateProductDto } from './DTOs/updateproduct.dto'
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';

@Injectable()

 export class AuthService{


    private products = [
        {
            id: uuidv4(),
            name: "Ali",
            price: 20,
        },
        {
            id: uuidv4(),
            name: "Carosine",
            price: 50,
        }
    ];

    getAllProducts(){
        return this.products;
    }

    getProductsById(id: string){
        const product = this.products.find((product) => product.id === id);
        
        if (!product) {
            throw new NotFoundException("Sorry Product is not found");
        }
        return product;
    }

    findProductByPrice(minPrice: number){
        console.log(minPrice)
        const product = this.products.filter(product => product.price >= Number(minPrice));
        if(!product.length){
            throw new NotFoundException();
        }
        return product;
    }

    CreateProduct(product: CreateProductsDto){
        const newProduct = {
            id: uuidv4(),
            ...product,
        }
        this.products.push(newProduct);
        return newProduct;
    }

    updateProduct(id: string, updateProductDto: UpdateProductDto){
        const product = this.products.find(product => product.id ==id);
        if(!product){
            throw new NotFoundException('Product not found');
        }
        console.log('product', product)
        console.log('updateProductDto', updateProductDto);

        if(updateProductDto.name) product.name = updateProductDto.name;
        if(updateProductDto.price) product.price = updateProductDto.price;
        return product;
    }

    deleteProduct(id: string){
        const product = this.products.find((product) => product.id === id);
        if(product) {
            throw new NotFoundException("Product Not Finded");
        }
        this.products = this.products.filter((product) => product.id != id);
    }
 }
