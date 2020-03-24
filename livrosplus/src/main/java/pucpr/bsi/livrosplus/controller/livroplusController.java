package pucpr.bsi.livrosplus.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pucpr.bsi.livrosplus.controller.dto.LivroDTO;

@RestController
public class livroplusController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello world";
    }

    @GetMapping("/livro")
    public LivroDTO getLivro() {
        LivroDTO livro = new LivroDTO( 1l, "LIvro A", "Autor Alpha");
        return livro;
    }
}
