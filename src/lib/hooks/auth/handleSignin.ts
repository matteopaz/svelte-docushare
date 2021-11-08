// @ts-expect-error
import { API_URL } from '/src/global.d';
// @ts-expect-error
import type { AuthenticationForm } from '/src/global.d';
export default async function handleSignin(signup: AuthenticationForm): Promise<void> {
    signup.status = '';
    signup.error = false;
    if (signup.email.length <= 0 || signup.password.length <= 0) {
        signup.status = 'Please fill in all fields';
        signup.error = true;
        return;
    }
    const getPasswordStrength = (pass: string): number => {
        const length_one = pass.length > 8 ? 1 : 0;
        const length_two = pass.length > 12 ? 1 : 0;
        const lowercase = pass.match(/[a-z]/) ? 1 : 0;
        const capital = pass.match(/[A-Z]/) ? 1 : 0;
        const numbers = pass.match(/[0-9]/) ? 1 : 0;
        const nonAlphas = pass.match(/[^a-zA-Z\d\s:]/) ? 1 : 0;
        return length_one + length_two + lowercase + capital + numbers + nonAlphas;
    };
    const strength = getPasswordStrength(signup.password);
    if (strength < 4) {
        signup.error = true;
        signup.status =
            'Please create a stronger password, use uppercase, numbers, non-alphanumerics or increase length';
    } else {
        const fetcher = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signup.email,
                password: signup.password
            })
        });
        const res = fetcher;
        if (res.status === 200) {
            signup.status = `${await res.text()}, you may now log in.`;
        } else {
            signup.error = true;
            signup.status = await res.text();
        }
    }
}