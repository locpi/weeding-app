package fr.loicpincon;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	/**
	 * configure security.
	 *
	 * @param httpSecurity
	 * @return security
	 * @throws Exception
	 */
	@Bean
	public SecurityFilterChain securityFilterChain(final HttpSecurity httpSecurity) throws Exception {
		return httpSecurity
				.cors(Customizer.withDefaults())
				.csrf(AbstractHttpConfigurer::disable)
				.headers(h -> h.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
//				.authorizeHttpRequests(ar -> ar.requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/actuator/**").permitAll())
//				.authorizeHttpRequests(ar -> ar.requestMatchers("/public/**").permitAll())
//				.authorizeHttpRequests(ar -> ar.anyRequest().authenticated())
								.authorizeHttpRequests(ar -> ar.anyRequest().permitAll())

//				.oauth2ResourceServer(oauth2 -> oauth2
//						.jwt(jwt -> jwt
//								.jwtAuthenticationConverter(new JwtAuthConverter())
//						)
//				)
		.build();
	}
}
