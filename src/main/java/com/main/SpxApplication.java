package com.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling //必须加此注解
@ServletComponentScan
@SpringBootApplication
public class SpxApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpxApplication.class, args);
	}

}
