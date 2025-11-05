# Contributing to Non-Profit Donation Platform

Thank you for your interest in contributing to our project! This document provides guidelines and instructions for contributing.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive
- Welcome newcomers
- Focus on what is best for the community
- Show empathy towards others
- Accept constructive criticism gracefully

## 🚀 Getting Started

### Prerequisites

- Node.js 25+
- Git
- Basic knowledge of TypeScript, React, and Express.js

### Setup Development Environment

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/nonprofit-donation-platform.git`
3. Add upstream remote: `git remote add upstream https://github.com/ORIGINAL_OWNER/nonprofit-donation-platform.git`
4. Install dependencies: `npm install`
5. Follow the [Setup Guide](./SETUP.md)

## 🔄 Development Workflow

### 1. Create a Branch

```bash
git checkout develop
git pull upstream develop
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical production fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or modifications

### 2. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run linter
npm run lint

# Run tests
npm test

# Run both
npm run lint && npm test
```

### 4. Commit Your Changes

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
git commit -m "feat: add donation export feature"
git commit -m "fix: resolve payment processing bug"
git commit -m "docs: update API documentation"
```

Commit types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Reference any related issues
- Screenshots for UI changes
- List of changes made

## 📝 Code Style Guidelines

### TypeScript

- Use TypeScript strict mode
- Define proper types for all functions and variables
- Avoid `any` type unless absolutely necessary
- Use interfaces for object shapes
- Use enums for fixed sets of values

### React

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types
- Memoize expensive computations

### Naming Conventions

- Components: PascalCase (`DonationForm.tsx`)
- Functions: camelCase (`handleSubmit`)
- Constants: UPPER_SNAKE_CASE (`MAX_DONATIONS`)
- Files: PascalCase for components, camelCase for utilities
- CSS classes: kebab-case or Tailwind classes

### Code Organization

```typescript
// 1. Imports (external first, then internal)
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

// 2. Types/Interfaces
interface DonationFormProps {
  onSubmit: (data: DonationData) => void;
}

// 3. Component
export function DonationForm({ onSubmit }: DonationFormProps) {
  // 3a. Hooks
  const [loading, setLoading] = useState(false);
  const form = useForm();

  // 3b. Functions
  const handleSubmit = () => {
    // Implementation
  };

  // 3c. Render
  return (
    // JSX
  );
}
```

## 🧪 Testing Guidelines

### Unit Tests

- Test individual functions and components
- Mock external dependencies
- Aim for 80%+ code coverage
- Use descriptive test names

```typescript
describe('DonationService', () => {
  it('should create a donation successfully', async () => {
    // Arrange
    const donationData = { amount: 100, currency: 'USD' };

    // Act
    const result = await donationService.create(donationData);

    // Assert
    expect(result.status).toBe('COMPLETED');
  });
});
```

### Integration Tests

- Test API endpoints end-to-end
- Use test database
- Test error scenarios

### E2E Tests

- Test critical user flows
- Use Playwright for browser automation
- Test across different browsers

## 📚 Documentation

### Code Comments

- Comment complex logic
- Use JSDoc for functions
- Explain "why", not "what"

```typescript
/**
 * Processes a recurring donation by creating a new payment intent
 * and updating the subscription status.
 *
 * @param subscriptionId - The ID of the subscription to process
 * @returns Promise resolving to the created donation
 * @throws {PaymentError} If payment processing fails
 */
async function processRecurringDonation(subscriptionId: string): Promise<Donation> {
  // Implementation
}
```

### README Updates

- Update README.md for new features
- Add examples for new functionality
- Keep documentation in sync with code

## 🐛 Reporting Bugs

### Before Submitting

- Check existing issues to avoid duplicates
- Verify the bug in the latest version
- Collect relevant information

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]
```

## 💡 Suggesting Enhancements

### Feature Request Template

```markdown
**Problem**
Describe the problem or limitation you're facing.

**Proposed Solution**
Describe your proposed solution.

**Alternatives**
Describe any alternative solutions you've considered.

**Additional Context**
Any other context or screenshots.
```

## 🔍 Code Review Process

### For Contributors

- Respond to feedback promptly
- Be open to suggestions
- Ask questions if unclear
- Update PR based on feedback

### For Reviewers

- Be respectful and constructive
- Explain the "why" behind suggestions
- Approve or request changes clearly
- Test the changes locally if needed

## 📋 Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows the style guidelines
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] Commit messages follow conventions
- [ ] No console errors or warnings
- [ ] Reviewed your own code
- [ ] PR description is clear

## 🏆 Recognition

Contributors will be recognized in:
- README.md Contributors section
- Release notes
- Annual contributor spotlight

## 📞 Getting Help

- **Questions**: Open a Discussion on GitHub
- **Bugs**: Open an Issue
- **Security**: Email security@nonprofit.org (do not open public issue)
- **Chat**: Join our Slack channel

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to making a difference! 🎉
