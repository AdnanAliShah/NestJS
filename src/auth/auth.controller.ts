import { ApiKeyGuard } from 'src/api-key/api-key.guard';
import { CreateProductsDto } from './DTOs/createproduct.dto';
import { UpdateProductDto } from './DTOs/updateproduct.dto';
import { AuthService } from './auth.service';
import { Controller , Query ,Post, Get, Param, Body,
        Delete, Patch, HttpCode,UseGuards,Logger
    } from "@nestjs/common";


@UseGuards(ApiKeyGuard)
@Controller('auth')
export class AuthController{
    private readonly logger = new Logger(AuthController.name)
    constructor(private authService: AuthService){}
            
            
    @Get()
    getAllProduct(){
        this.logger.log('Getting the products')
        return this.authService.getAllProducts();
    }

    @Get('/search')
    getProductByPrice(@Query('minPrice') minPrice: string){
        console.log('This i from /search', minPrice )
        return this.authService.findProductByPrice(Number(minPrice));
    }
    @Get('/:id')
    getProductById(@Param('id') id: string){
        console.log('This i from /:id', id )
        const response = this.authService.getProductsById(id);
        return response;
    }
    

    @Post('/')
     
    CreateProduct(@Body() products: CreateProductsDto) {
        console.log(products);
        return this.authService.CreateProduct(products);
    }
    
    
    @Patch('/:id')
    
    updateProduct(@Param('id') id: string, 
    @Body() updateProductDto: UpdateProductDto)
    {
        return this.authService.updateProduct(id, updateProductDto)
    }

    @HttpCode(204)
    @Delete("/:id")
    deleteProduct(@Param('id') id : string){
        return this.authService.deleteProduct(id);
    }
}
