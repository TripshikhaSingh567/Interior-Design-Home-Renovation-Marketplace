package com.interiormarketplace;

import org.springframework.boot.SpringApplication;

public class TestInteriorDesignMarketplaceApplication {

    public static void main(String[] args) {
        SpringApplication.from(InteriorDesignMarketplaceApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
