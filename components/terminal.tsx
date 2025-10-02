import { AnimatedSpan, Terminal, TypingAnimation } from "./ui/terminal";

export function TerminalAnimated() {
    return (
        <Terminal>
            <TypingAnimation>&gt; Seeting things up...</TypingAnimation>

            <AnimatedSpan className='text-green-500'>
                ✔ Preflight checks.
            </AnimatedSpan>

            <AnimatedSpan className='text-green-500'>
                ✔ Verifying documents types.
            </AnimatedSpan>

            <AnimatedSpan className='text-green-500'>
                ✔ Trying to connect with server
            </AnimatedSpan>

            <AnimatedSpan className='text-green-500'>
                ✔ reading docs.
            </AnimatedSpan>

            <AnimatedSpan className='text-green-500'>
                ✔ Extracting informations.
            </AnimatedSpan>

            <AnimatedSpan className='text-green-500'>
                ✔ Parsing informations.
            </AnimatedSpan>

            <AnimatedSpan className='text-green-500'>
                ✔ We are ready to go.
            </AnimatedSpan>

            <AnimatedSpan className='text-green-500'>
                ✔ Found two files
            </AnimatedSpan>

            <AnimatedSpan className='text-green-500'>
                ✔ Almost there....
            </AnimatedSpan>

            <AnimatedSpan className='text-blue-500'>
                <span>Just be patient:</span>
                <span className='pl-2'>- It can take a while</span>
            </AnimatedSpan>

            <TypingAnimation className='text-muted-foreground'>
                let things with us
            </TypingAnimation>

            <TypingAnimation className='text-muted-foreground'>
                I'll let you know when it's done
            </TypingAnimation>
        </Terminal>
    );
}
