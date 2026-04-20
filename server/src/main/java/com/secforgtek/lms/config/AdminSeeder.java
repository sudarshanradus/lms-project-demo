package com.secforgtek.lms.config;

import com.secforgtek.lms.auth.AuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AdminSeeder implements CommandLineRunner {
  private final AuthService authService;
  private final String adminEmail;
  private final String adminPassword;

  public AdminSeeder(AuthService authService,
                     @Value("${app.seed.admin-email}") String adminEmail,
                     @Value("${app.seed.admin-password}") String adminPassword) {
    this.authService = authService;
    this.adminEmail = adminEmail;
    this.adminPassword = adminPassword;
  }

  @Override
  public void run(String... args) {
    authService.ensureAdminExists(adminEmail, adminPassword);
  }
}
